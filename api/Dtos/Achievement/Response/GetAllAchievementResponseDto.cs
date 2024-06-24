using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Achievement.Response
{
    public class GetAllAchievementResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string ImageSrc { get; set; } = string.Empty;
        public List<string> Attachments { get; set; } = new List<string> { };
        public List<string> AttachmentSrc { get; set; } = new List<string> { };
    }
}