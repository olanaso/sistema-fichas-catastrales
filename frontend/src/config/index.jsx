
import { initAxiosInterceptors } from "./axios"

/*Aqui hay que mostar toda la confirguracion a un context para que pueda ser accesado a cualquier parte de proyecto*/
export default { Axios: initAxiosInterceptors() };

