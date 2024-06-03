using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Experience.Request
{
    public class UpdateExperienceRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Accomplishment { get; set; } = string.Empty;
        [Required]
        public string ParentName { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
        public string ImageCover { get; set; } = string.Empty;
        public IFormFile? ImageFile { get; set; }
        public List<string> ImageCollection { get; set; } = new List<string>();
        public List<IFormFile>? ImageFileCollection { get; set; } = new List<IFormFile>();
    }
}