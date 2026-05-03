import { axiosWithAuth } from "@/src/shared/api/api.interceptor";
import type { IConsultation } from "@/src/types/consultations";

class ConsultationsService {
  async getAll() {
    const res = await axiosWithAuth<IConsultation[]>({
      url: "/consultations",
      method: "GET",
    });

    return res;
  }

  async getById(id: string) {
    const res = await axiosWithAuth<IConsultation>({
      url: `/consultations/${id}`,
      method: "GET",
    });

    return res;
  }

  async create(data: { patientId: string; doctorId: string }) {
    const res = await axiosWithAuth<{ message: string }>({
      url: "/consultations",
      method: "POST",
      data,
    });

    return res;
  }

  async updateRecommendations(id: string, data: { recommendations: string }) {
    const res = await axiosWithAuth<{ message: string }>({
      url: `/consultations/${id}/recommendations`,
      method: "PATCH",
      data,
    });

    return res;
  }

  async updateComments(id: string, data: { comments: string }) {
    const res = await axiosWithAuth<{ message: string }>({
      url: `/consultations/${id}/comments`,
      method: "PATCH",
      data,
    });

    return res;
  }
}

export const consultationsService = new ConsultationsService();
