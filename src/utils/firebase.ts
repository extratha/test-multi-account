import { app } from "@/config/firebase";
import { RemoteConfig, fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";

let remoteConfigVar: RemoteConfig;
if (typeof window !== 'undefined') {
	remoteConfigVar = getRemoteConfig(app);
	remoteConfigVar.settings.minimumFetchIntervalMillis = 60000; // 1 Minute
}

export const remoteConfig = {
	getString: (key: string) => fetchAndActivate(remoteConfigVar).then(() => getValue(remoteConfigVar, key).asString()),
	getBoolean: (key: string) => fetchAndActivate(remoteConfigVar).then(() => getValue(remoteConfigVar, key).asBoolean()),
	getNumber: (key: string) => fetchAndActivate(remoteConfigVar).then(() => getValue(remoteConfigVar, key).asNumber())
}