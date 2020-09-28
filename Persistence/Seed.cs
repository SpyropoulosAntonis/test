using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,UserManager<AppUsers> usermanager)
        {

            if(!usermanager.Users.Any())
            {
                var users = new List<AppUsers>
                {

                    new AppUsers
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email="bob@test.com"
                    },

                       new AppUsers
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email="tom@test.com"
                    },

                       new AppUsers
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email="jane@test.com"
                    },



                };

                foreach(var user in users)
                {
                    await usermanager.CreateAsync(user, "Pa$$w0rd");
                }
                


            }

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
