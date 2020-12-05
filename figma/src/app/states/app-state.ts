import { atom } from "recoil";

export enum WorkspaceMode {
    code,
    design,
    content,
    settings,
}

export enum WorkScreen {
    code,
    icon,
    lint,
    g11n,
    dev,
    slot,
}


const appWorkspaceModeAtom = atom({
    key: 'app-workspace-mode',
    default: undefined!
})

const appWorkScreeAtom = atom({
    key: 'app-work-screen',
    default: undefined!
})