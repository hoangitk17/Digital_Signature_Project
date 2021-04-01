import { AUDIO_LOCAL } from '../consts/constants';
import { get, save } from "../services/localStorage";
export default {
    getAudioLocal: () => {
        const audio = get(AUDIO_LOCAL);
        if (audio == null) {
            save(AUDIO_LOCAL, true);
            return true;
        }

        return audio;
    },
    updateAudioLocal: (isAudio) => {
        save(AUDIO_LOCAL, isAudio);
    }
}
