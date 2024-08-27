import axios from "axios";
import { useContext } from "react";
import { AuthHeader } from "./auth.header";
import { Contexts } from "./Contexts";

const base_url = "http://localhost:8000/digi";

// const timeAgo = (dateString: string): string => {
//   const now = new Date();
//   const pastDate = new Date(dateString);

//   const nowUTC = Date.UTC(
//     now.getUTCFullYear(),
//     now.getUTCMonth(),
//     now.getUTCDate(),
//     now.getUTCHours(),
//     now.getUTCMinutes(),
//     now.getUTCSeconds()
//   );
//   const pastDateUTC = Date.UTC(
//     pastDate.getUTCFullYear(),
//     pastDate.getUTCMonth(),
//     pastDate.getUTCDate(),
//     pastDate.getUTCHours(),
//     pastDate.getUTCMinutes(),
//     pastDate.getUTCSeconds()
//   );

//   const diff = nowUTC - pastDateUTC;

//   const minute = 60 * 1000;
//   const hour = 60 * minute;
//   const day = 24 * hour;
//   const month = 30 * day;
//   const year = 365 * day;

//   if (diff < minute) {
//     // const seconds = Math.floor(diff / 1000);
//     return `${pastDate.getHours()}:${pastDate.getMinutes()}`;
//   } else if (diff < hour) {
//     const minutes = Math.floor(diff / minute);
//     return `${minutes} min${minutes !== 1 ? "s" : ""}`;
//   } else if (diff < day) {
//     const hours = Math.floor(diff / hour);
//     return `${hours} hr${hours !== 1 ? "s" : ""}`;
//   } else if (diff < month) {
//     const days = Math.floor(diff / day);
//     return `${days} d${days !== 1 ? "s" : ""}`;
//   } else if (diff < year) {
//     const months = Math.floor(diff / month);
//     const days = Math.floor((diff % month) / day);
//     return `${months} m${months !== 1 ? "es" : ""}${
//       days > 0 ? ` y ${days} d${days !== 1 ? "s" : ""}` : ""
//     }`;
//   } else {
//     const years = Math.floor(diff / year);
//     const months = Math.floor((diff % year) / month);
//     return `${years} a${years !== 1 ? "s" : ""}${
//       months > 0 ? ` y ${months} m${months !== 1 ? "es" : ""}` : ""
//     }`;
//   }
// };

export const useUserServices = () => {
  const { sendMessage } = useContext(Contexts);

  const get_users = async ({
    includeAdmins = false,
  }: {
    includeAdmins?: boolean;
  }): Promise<User[] | false> => {
    try {
      const response = await axios.get(`${base_url}/users/`, {
        headers: AuthHeader(),
        params: { includeAdmins },
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      return false;
    }
  };

  const get_user = async ({ id }: { id: number }): Promise<User | false> => {
    try {
      const response = await axios.get<User>(`${base_url}/users/${id}/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching companies: ${error}`);
      return false;
    }
  };

  const get_companies = async (): Promise<Company[] | false> => {
    try {
      const response = await axios.get<Company[]>(`${base_url}/companies/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching companies: ${error}`);
      return false;
    }
  };

  const get_company = async ({
    id,
  }: {
    id: number;
  }): Promise<Company | false> => {
    try {
      const response = await axios.get<Company>(
        `${base_url}/companies/${id}/`,
        {
          headers: AuthHeader(),
        }
      );
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching companies: ${error}`);
      return false;
    }
  };

  const get_tickets = async (query_params?: {
    [key: string]: any;
  }): Promise<ResponseTickets | false> => {
    try {
      const response = await axios.get<ResponseTickets>(
        `${base_url}/tickets/`,
        {
          headers: AuthHeader(),
          params: query_params,
        }
      );
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching tickets: ${error}`);
      return false;
    }
  };

  const get_ticket = async ({
    id,
  }: {
    id: number;
  }): Promise<Ticket | false> => {
    try {
      const response = await axios.get<Ticket>(`${base_url}/tickets/${id}/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching ticket: ${error}`);
      return false;
    }
  };

  const get_categories = async (): Promise<Category[] | false> => {
    try {
      const response = await axios.get<Category[]>(`${base_url}/categories/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching categories: ${error}`);
      return false;
    }
  };

  const get_category = async ({
    id,
  }: {
    id: number;
  }): Promise<Category | false> => {
    try {
      const response = await axios.get<Category>(
        `${base_url}/categories/${id}/`,
        {
          headers: AuthHeader(),
        }
      );
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching category: ${error}`);
      return false;
    }
  };

  const update_user = async ({ user_details }: { user_details: User }) => {
    try {
      const response = await axios.put<User>(
        `${base_url}/users/${user_details.id}/`,
        user_details,
        {
          headers: AuthHeader(),
        }
      );
      if (response.status !== 200) {
        return false;
      }
      if (!response.data.is_active) {
        sendMessage({
          type: "user_disabled",
          message: "Desconectado del sistema",
          payload: { user: response },
        });
      } else {
        sendMessage({
          type: "user_updated",
          message: "Usuario actualizado",
          payload: { user: response },
        });
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching user: ${error}`);
      return false;
    }
  };

  const get_company_details = async (): Promise<Company | false> => {
    try {
      const response = await axios.get<Company>(`${base_url}/company/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching companies: ${error}`);
      return false;
    }
  };

  const update_company = async (details: UpdateCompany | Company) => {
    try {
      const response = await axios.put<Company>(
        `${base_url}/company/`,
        details,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
        }
      );
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching company: ${error}`);
      return false;
    }
  };

  const update_ticket = async ({ details }: { details: UpdateTicket }) => {
    try {
      const id = details.id;
      const response = await axios.put<Ticket>(
        `${base_url}/tickets/${id}/`,
        details,
        {
          headers: AuthHeader(),
        }
      );
      if (response.status !== 200) {
        return false;
      }
      console.log("response.data.collaborator", response.data.collaborator);
      sendMessage({
        type: "ticket_updated",
        message: "Ticket actualizado",
        payload: { collaborator: response.data.collaborator },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching ticket: ${error}`);
      return false;
    }
  };

  const create_ticket = async (details: CreateTicket) => {
    try {
      const response = await axios.post(`${base_url}/tickets/`, details, {
        headers: AuthHeader(),
      });
      if (response.status !== 201) {
        return false;
      }
      sendMessage({
        type: "ticket_added",
        message: "Ticket creado",
        payload: { ticket: response.data },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ticket: ${error}`);
      return false;
    }
  };

  const get_metrics = async () => {
    try {
      const response = await axios.get(`${base_url}/metrics/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching metrics: ${error}`);
      return false;
    }
  };

  const get_metrics_for_id = async (id: number) => {
    try {
      const response = await axios.get(`${base_url}/metrics/${id}/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching metrics: ${error}`);
      return false;
    }
  };

  const get_random_color = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 40) + 30;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const get_graph = async ({
    graphname,
    allusers = false,
  }: {
    graphname: string;
    allusers?: boolean;
  }): Promise<UserData[] | false> => {
    try {
      const response = await axios.get(`${base_url}/metrics/${graphname}/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching graph: ${error}`);
      return false;
    }
  };

  const get_payments = async () => {
    try {
      const response = await axios.get(`${base_url}/payments/`, {
        headers: AuthHeader(),
      });
      
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments: ${error}`);
      return false;
    }
  };

  const get_payments_for_id = async (id: number) => {
    try {
      const response = await axios.get(`${base_url}/payments/${id}/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments: ${error}`);
      return false;
    }
  };

  const get_percentages = async () => {
    try {
      const response = await axios.get(`${base_url}/metrics/percentages/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching percentages: ${error}`);
      return false;
    }
  };

  const get_tickets_percentages = async () => {
    try {
      const response = await axios.get(`${base_url}/metrics/tickets/`, {
        headers: AuthHeader(),
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching tickets: ${error}`);
      return false;
    }
  };

  return {
    get_company_details,
    get_users,
    update_user,
    update_company,
    update_ticket,
    create_ticket,
    get_metrics,
    get_metrics_for_id,
    get_graph,
    get_payments,
    get_payments_for_id,
    get_random_color,
    get_companies,
    get_user,
    get_categories,
    get_tickets,
    get_ticket,
    get_company,
    get_category,
    get_percentages,
    get_tickets_percentages,
  };
};
