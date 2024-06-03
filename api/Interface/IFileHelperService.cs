using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interface
{
    public interface IFileHelperService
    {
        Task<string> SaveImageAsync(IFormFile imageFile, string folder);
        string DeleteImage(string imageName, string folder);
    }
}