using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interface
{
    public interface IProjectRepository
    {
        Task<Project> CreateAsync(Project model);
        Task<List<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project?> UpdateAsync(int id, Project model);
        Task<string> DeleteAllAsync();
        Task<Project?> DeleteByIdAsync(int id);
    }
}