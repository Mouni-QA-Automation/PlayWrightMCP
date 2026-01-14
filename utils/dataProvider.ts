import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class DataProvider {
    static getDataFromJson(filePath: string): any[]{
        const absolutePath = path.resolve(process.cwd(), filePath);
        return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));    
    }

    static async getDataFromCsv(filePath: string): Promise<any[]> {
        let data = parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true} );
        return data;
    }
}
