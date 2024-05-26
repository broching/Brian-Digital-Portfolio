using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Achievement.Request
{
    public class CreateAchievementRequestDto
    {
        [Required]
        [MaxLength(25, ErrorMessage = "Title Cannot Be over 25 characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MaxLength(2000, ErrorMessage = "Description Cannot Be over 2000 characters")]
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}