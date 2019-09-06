import axios from "axios"
import { B2B_API } from '../config'

export const getAuction = async (id) => {
    const result = await axios.get(
    `${B2B_API}/auction?id=${id}`
  );
  console.log(result.data)
  return result.data
}