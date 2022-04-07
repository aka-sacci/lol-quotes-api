import { iMockData } from "../../@types/myTypes";

class mockUsersCrypted implements iMockData {
    async insert(connection: any): Promise<void> {
        
            const mockedUsersSchema = connection.model('users')
            const userToBeInsert = new mockedUsersSchema({
                email: "testmail@mail.com",
                password: "$2a$12$Yh65Ngo4/R6eV5MaguqdPuq3.sW2jpXO18cPokLAXgIyAQhwlqYAy",
                name: "Test User"
            })
            await userToBeInsert.save();
    }

    async delete(connection: any): Promise<void> {
        const mockedUsers = connection.model('users')
        await mockedUsers.deleteMany({})
    }
}

module.exports = mockUsersCrypted