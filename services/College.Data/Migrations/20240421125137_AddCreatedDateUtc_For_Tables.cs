using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace College.Data.Migrations
{
    public partial class AddCreatedDateUtc_For_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "Templates",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "SubCategories",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "Pages",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "News",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "Images",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateUtc",
                table: "Categories",
                type: "datetime2(2)",
                nullable: false,
                defaultValueSql: "(sysutcdatetime())");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "SubCategories");

            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "News");

            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "CreateDateUtc",
                table: "Categories");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
