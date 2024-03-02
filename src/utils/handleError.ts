import axios from "axios";

// доработать
export function handleError(e) {
    if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
            const errors = e?.response?.data;
            console.log(errors)
        } else {
            console.log('api error')
        }
    }
}