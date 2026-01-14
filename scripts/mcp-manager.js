#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const cmd = process.argv[2];
const pidFile = path.resolve(__dirname, '..', '.mcp.pid');

function start() {
    if (fs.existsSync(pidFile)) {
        console.error('MCP PID file exists. Is MCP already running?');
        process.exit(1);
    }
    let cliPath;
    try {
        cliPath = require.resolve('@playwright/mcp/cli.js');
    } catch (e) {
        console.error('Cannot resolve @playwright/mcp CLI. Is the package installed?');
        process.exit(1);
    }

    const child = spawn(process.execPath, [cliPath, 'start'], {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
    fs.writeFileSync(pidFile, String(child.pid), 'utf8');
    console.log('MCP started, PID', child.pid);
}

function stop() {
    if (!fs.existsSync(pidFile)) {
        console.error('No MCP pid file found.');
        process.exit(1);
    }
    const pid = parseInt(fs.readFileSync(pidFile, 'utf8'), 10);
    try {
        process.kill(pid);
        console.log('Sent kill to PID', pid);
        try { fs.unlinkSync(pidFile); } catch { }
    } catch (e) {
        console.error('Failed to kill PID:', e.message);
        if (process.platform === 'win32') {
            const taskkill = spawn('taskkill', ['/PID', String(pid), '/F', '/T'], { stdio: 'inherit' });
            taskkill.on('exit', code => {
                if (code === 0) {
                    try { fs.unlinkSync(pidFile); } catch { }
                    process.exit(0);
                }
                process.exit(code);
            });
            return;
        }
        process.exit(1);
    }
}

function status() {
    if (!fs.existsSync(pidFile)) {
        console.log('MCP not running (no pid file).');
        process.exit(0);
    }
    const pid = parseInt(fs.readFileSync(pidFile, 'utf8'), 10);
    try {
        process.kill(pid, 0);
        console.log('MCP running, PID', pid);
    } catch (e) {
        console.log('PID file exists but process is not running.');
    }
}

if (!cmd) {
    console.log('Usage: node mcp-manager.js start|stop|status');
    process.exit(1);
}

if (cmd === 'start') start();
else if (cmd === 'stop') stop();
else if (cmd === 'status') status();
else {
    console.error('Unknown command:', cmd);
    process.exit(1);
}
