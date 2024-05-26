using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Achievement.Response
{
    public class CreateAchievementResponseDto
    {
        public int Id {get; set; }
        [Required]
        [MaxLength(25, ErrorMessage = "Title Cannot Be over 25 characters")]
        public string Title { get; set; } = string.Empty;
    }
}