export default interface SignupRequest{
    email: string
    password: string
    name: string
    riskProfile: number
    telegramId?: string
}