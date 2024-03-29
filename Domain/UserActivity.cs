﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class UserActivity
    {
     
        public string AppUserId { get; set; }
        public virtual AppUsers AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public  virtual Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }

    }
}
