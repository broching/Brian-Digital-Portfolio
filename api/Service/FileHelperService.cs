using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interface;
using Microsoft.AspNetCore.Mvc;

namespace api.Utils
{
    public class FileHelperService : IFileHelperService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FileHelperService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        [NonAction]
        public async Task<string> SaveImageAsync(IFormFile imageFile, string folder)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Image/{folder}", imageName);
            using (var filestream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(filestream);
            }
            return imageName;
        }

        [NonAction]
        public string DeleteImage(string imageName, string folder)
        {
            var imagePath =  Path.Combine(_webHostEnvironment.ContentRootPath, $"Image/{folder}", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
            var response = $"Image: {imageName} has been deleted";
            return response;
        }
    }
}