export type AuthState = {
    accessToken: string
    account: accountState
}

type accountState = {
    uid: string
    email: string
    photoURL: string
    displayName: string
}

export type AuthPayload = {
    email: string
    password: string
}
