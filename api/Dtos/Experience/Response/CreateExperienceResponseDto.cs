using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Experience.Response
{
    public class CreateExperienceResponseDto
    {
        public string Title { get; set; } = string.Empty;
        public string ParentName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}