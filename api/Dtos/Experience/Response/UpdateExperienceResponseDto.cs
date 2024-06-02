using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Experience.Response
{
    public class UpdateExperienceResponseDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string ParentName { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
    }
}