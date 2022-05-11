import { ApiResidentialComplexService } from '@shared/api';
import { makeAutoObservable } from 'mobx';

class ResidentialComplexesModel {
  residentialComplexes = [];
  isLoading = false;
  isError = false;
  residentialComplexesPerPage = 20;
  pagination = {
    existsMore: false,
    totalPagesCount: null,
    totalResidentialComplexesCount: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setInitialValues() {
    this.residentialComplexes = [];
    this.isLoading = false;
    this.isError = false;
    this.pagination = {
      existsMore: false,
      totalPagesCount: null,
      totalResidentialComplexesCount: 0,
    };
  }

  addResidentialComplex(complexInfo) {
    this.residentialComplexes.unshift(complexInfo);
  }

  setPagination(pagination) {
    this.pagination = pagination;
  }

  setResidentialComplexes(residentialComplexes) {
    this.residentialComplexes = residentialComplexes;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async fetch(currentPage) {
    try {
      this.setLoading(true);
      const response = await ApiResidentialComplexService.fetch(currentPage, this.residentialComplexesPerPage);

      const { items, existsMore, total, totalPagesCount } = response.data;

      this.setResidentialComplexes(items);
      this.setPagination({
        totalResidentialComplexesCount: total,
        totalPagesCount,
        existsMore,
      });

      this.setLoading(false);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  async fetchById(id) {
    return ApiResidentialComplexService.fetchById(id)
  }

  async createComplex(complexInfo) {
    try {
      const response = await ApiResidentialComplexService.create(complexInfo);

      this.addResidentialComplex(response.data);

      return response
    } catch (error) {
      const { errors } = error.response.data
      alert(JSON.stringify(errors))
    }
  }

  async updateComplex(complexId, data) {
    try {
      const response = await ApiResidentialComplexService.update(complexId, data);

      this.setUpdatedComplex(response.data)

      return response
    } catch (error) {
      const { errors } = error.response.data
      alert(JSON.stringify(errors))
    }
  }

  async deleteComplex(residentialComplexId) {
    await ApiResidentialComplexService.delete(residentialComplexId);

    const residentialComplexes = this.residentialComplexes.filter(
      (residentialComplex) => residentialComplex.id !== residentialComplexId,
    );

    this.setResidentialComplexes(residentialComplexes);
  }

  setUpdatedComplex(complex) {
    const indexOfUpdatedComplex = this.residentialComplexes.findIndex(item => item.id === complex.id)
    this.residentialComplexes[indexOfUpdatedComplex] = complex
  }
}

export const residentialComplexesModel = new ResidentialComplexesModel();
