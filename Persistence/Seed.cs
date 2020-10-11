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
                        Id="a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email="bob@test.com"
                    },

                       new AppUsers
                    {   Id="b",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email="tom@test.com"
                    },

                       new AppUsers
                    {   Id="c",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email="jane@test.com"
                    },



                };

                foreach(var user in users)
                {
                    await usermanager.CreateAsync(user, "Antonis123.");
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
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId="a",
                                IsHost= true,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                     new Activity
                    {
                        Title   = "Future Activity 1",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                         UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId="b",
                                IsHost= true,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                      new Activity
                    {
                        Title   = "Future Activity 2",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                         UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId="c",
                                IsHost= true,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                       new Activity
                    {
                        Title   = "Future Activity 3",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                         UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId="a",
                                IsHost= true,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            },
                            
                            new UserActivity
                            {
                                AppUserId="b",
                                IsHost= false,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            }
                        }
                        
                    },
                        new Activity
                    {
                        Title   = "Future Activity 4",
                        Date =  DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                         UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId="b",
                                IsHost= true,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId="c",
                                IsHost= false,
                                DateJoined =DateTime.Now.AddMonths(-2)
                            }

                        }
                    }
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}
