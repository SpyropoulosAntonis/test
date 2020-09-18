using Domain;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title   = "Future Activity 2",
                        Date =  DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "02 Arena",
                    },
                     new Activity
                    {
                        Title   = "Future Activity 1",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                      new Activity
                    {
                        Title   = "Future Activity 2",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                       new Activity
                    {
                        Title   = "Future Activity 3",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                        new Activity
                    {
                        Title   = "Future Activity 4",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    }
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}
