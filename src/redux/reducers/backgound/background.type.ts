export type BackgroundState = {
    background: Background[],
    loading: boolean
}

type Background = {
    name: string,
    status: boolean,
    type : string,
    backgroundDay : string,
    backgroundNight : string}