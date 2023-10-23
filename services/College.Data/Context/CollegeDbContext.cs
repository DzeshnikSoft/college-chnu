using College.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace College.Data.Context;

public class CollegeDbContext : DbContext
{
    public CollegeDbContext(DbContextOptions options) : base(options) { }

    public virtual DbSet<Page> Pages { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    public virtual DbSet<News> News { get; set; }
}
