
class mockQuotes {
    async insertMockedQuotes(connection: any): Promise<void> {
        const mockedQuotes = connection.model('quotes')
        const mockedData = new mockedQuotes({
            champion: "Champion Test 0",
            quote: "Quote Test 0",
            length: 1000,
            index: 0
        })
        await mockedData.save()
    }

    async deleteMockedQuotes (connection: any): Promise<void> {
        const mockedQuotes = connection.model('quotes')
        await mockedQuotes.deleteMany({})
    }

}

module.exports = mockQuotes