import { iMockData } from "../../@types/myTypes"

class mockQuotes implements iMockData {
    async insert(connection: any): Promise<void> {
        const mockedQuotes = connection.model('quotes')
        const mockedData = new mockedQuotes({
            champion: "Champion Test 0",
            quote: "Quote Test 0",
            length: 1000,
        })
        await mockedData.save()
    }

    async delete(connection: any): Promise<void> {
        const mockedQuotes = connection.model('quotes')
        await mockedQuotes.deleteMany({})
    }

}

module.exports = mockQuotes