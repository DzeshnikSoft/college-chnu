using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace College.Data.Migrations
{
    public partial class Add_Image_To_News : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainImage",
                table: "News");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "News",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_ImageId",
                table: "News",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Images_ImageId",
                table: "News",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Images_ImageId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_ImageId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "News");

            migrationBuilder.AddColumn<string>(
                name: "MainImage",
                table: "News",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
