using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Achievement
    {
        public int Id {get; set; }
        public string Title {get; set; } = string.Empty;
        public string Description {get; set;} = string.Empty;
        public string Image {get; set;} = string.Empty;
    }
}