import { iMockData } from "../../@types/myTypes";

class mockUsers implements iMockData {
    async insert(connection: any): Promise<void> {
        
            const mockedUsersSchema = connection.model('users')
            const userToBeInsert = new mockedUsersSchema({
                email: "testmail@mail.com",
                password: "testpassword",
                name: "Test User"
            })
            await userToBeInsert.save();
    }

    async delete(connection: any): Promise<void> {
        const mockedUsers = connection.model('users')
        await mockedUsers.deleteMany({})
    }
}

module.exports = mockUsers