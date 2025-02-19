import { get, post } from "../util/http";
const API = "/lead";
import authService from "./authService";

class LeadService {
  private api: string;

  constructor(api: string) {
    this.api = api;
  }

  async upsertLead(leadData: any) {
    const token = authService.getToken();
    return await post({
      api: `${this.api}/upsert`,
      options: {
        data: leadData,
        config: {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      }
    });
  }

  async getLead({ _id }: { _id: string }) {
    return await get({ api: `${this.api}/get/${_id}` });
  }

  async getAllLeads() {
    const token = authService.getToken();
    if (!token) throw new Error("No hay token de autenticación.");

    return await get({
      api: this.api,
      options: {
        config: {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      },
    });
  }
}



const leadService = new LeadService(API);
export default leadService;
