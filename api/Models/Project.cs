using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Accomplishment { get; set; } = string.Empty;
        public string Instruction {get; set;} = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string WebLink {get; set;} = string.Empty;
        public string ImageCover { get; set; } = string.Empty;
        public List<string> ImageCollection { get; set; } = new List<string>();
    }
}