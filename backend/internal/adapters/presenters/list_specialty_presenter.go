package presenters

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/sbsysdev/go-react-template/internal/application"
	"github.com/sbsysdev/go-react-template/internal/domain"
)

type listSpecialtyPresenter struct{}

func (*listSpecialtyPresenter) Present(ctx context.Context, specialties []*domain.Specialty) error {
	fiberCtx := ctx.Value("fiberContext").(*fiber.Ctx)
	return fiberCtx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Specialties retrieved successfully",
		"data": fiber.Map{
			"specialties": specialties,
		},
	})
}

func (*listSpecialtyPresenter) Error(ctx context.Context, err error) error {
	fiberCtx := ctx.Value("fiberContext").(*fiber.Ctx)
	return fiberCtx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": err.Error(),
	})
}

func NewListSpecialtyPresenter() application.ListSpecialtyPresenter {
	return &listSpecialtyPresenter{}
}
