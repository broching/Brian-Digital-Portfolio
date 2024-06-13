using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Project.Request
{
    public class CreateProjectRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Accomplishment { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        public string Instruction {get; set;} = string.Empty;
        public string WebLink {get; set;} = string.Empty;
        public string ImageCover { get; set; } = string.Empty;
        public IFormFile ImageCoverFile { get; set; }
        public List<string> ImageCollection { get; set; } = new List<string>();
        public List<IFormFile>? ImageCollectionFile { get; set; } = new List<IFormFile>();
    }
}