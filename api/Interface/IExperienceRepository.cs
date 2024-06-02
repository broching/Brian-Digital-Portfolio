using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interface
{
    public interface IExperienceRepository
    {
        Task<Experience> CreateExperienceAsync(Experience model);
        Task<Experience?> GetExperienceByIdAsync(int id);
        Task<List<Experience>> GetAllExperienceAsync();
        Task<Experience?> UpdateExperienceByIdAsync(int id, Experience model);
        Task<Experience?> DeleteExperienceByIdAsync(int id);
        Task<string> DeleteAllExperienceAsync(); 
    }
}