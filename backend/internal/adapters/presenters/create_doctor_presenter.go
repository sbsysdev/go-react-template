package presenters

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/sbsysdev/go-react-template/internal/application"
	"github.com/sbsysdev/go-react-template/internal/domain"
)

type createDoctorPresenter struct{}

func (*createDoctorPresenter) Present(ctx context.Context, doctor *domain.Doctor) error {
	fiberCtx := ctx.Value("fiberContext").(*fiber.Ctx)
	return fiberCtx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Doctor created successfully",
		"data": fiber.Map{
			"doctor": doctor,
		},
	})
}
func (*createDoctorPresenter) Error(ctx context.Context, err error) error {
	fiberCtx := ctx.Value("fiberContext").(*fiber.Ctx)
	return fiberCtx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": err.Error(),
	})
}

func NewCreateDoctorPresenter() application.CreateDoctorPresenter {
	return &createDoctorPresenter{}
}
