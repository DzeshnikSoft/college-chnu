using College.Domain.DTOs;
using College.Domain.Enumerations;
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

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Template> Templates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Page>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<Template>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.Property(e => e.CreateDateUtc)
                .HasColumnType("datetime2(2)")
                .HasDefaultValueSql("(sysutcdatetime())");
        });
    }
}
