import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
    
    static generateFirstName() {
        return faker.person.firstName();
    }

    static generateLastName() {
        return faker.person.lastName();
    }

    static generateFullName() {
        return faker.person.fullName();
    }   

    static generateEmail() {
        return faker.internet.email();
    }

    static generateTelephone() {
        return faker.phone.number();
    }

    static generateUsername() {
        return faker.internet.username();
    }   

    static generateRandomCountry(){
        return faker.location.country();        
    }

    static generateRandomCity(){
        return faker.location.city();
    }   

    static generateRandomAddress(){
        return faker.location.streetAddress();
    }   

    static generateRandomZipCode(){ 
        return faker.location.zipCode();
    }

    static generateRandomState(){
        return faker.location.state();
    }                    

    static generatePassword(length = 10) {
        return faker.internet.password({ length });
    }



}
