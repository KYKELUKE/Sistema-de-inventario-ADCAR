import { NextRequest, NextResponse } from "next/server";

const NHTSA_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const vin = searchParams.get("vin")?.trim().toUpperCase();
    const year = searchParams.get("year");

    // Validar que se haya proporcionado un VIN
    if (!vin) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes proporcionar un número VIN.",
        },
        { status: 400 },
      );
    }

    // Validar formato de VIN completo
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
      return NextResponse.json(
        {
          success: false,
          error: "El VIN debe contener 17 caracteres válidos.",
        },
        { status: 400 },
      );
    }

    // Validar año opcional
    if (year && !/^\d{4}$/.test(year)) {
      return NextResponse.json(
        {
          success: false,
          error: "El año debe tener cuatro dígitos.",
        },
        { status: 400 },
      );
    }

    // Construir consulta a NHTSA
    const url = new URL(`${NHTSA_API}/${encodeURIComponent(vin)}`);

    url.searchParams.set("format", "json");

    if (year) {
      url.searchParams.set("modelyear", year);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error de NHTSA: ${response.status}`);
    }

    const data = await response.json();

    const vehicle = data.Results?.[0];

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: "No se encontró información para este VIN.",
        },
        { status: 404 },
      );
    }

    // Organizar los datos para CRICIA
    const vehicleInfo = {
      vin: vehicle.VIN,
      fabricante: vehicle.Manufacturer,
      marca: vehicle.Make,
      modelo: vehicle.Model,
      año: vehicle.ModelYear,
      tipoVehiculo: vehicle.VehicleType,
      carroceria: vehicle.BodyClass,
      motor: vehicle.EngineModel,
      cilindrada: vehicle.DisplacementL,
      cilindros: vehicle.EngineCylinders,
      combustible: vehicle.FuelTypePrimary,
      transmision: vehicle.TransmissionStyle,
      traccion: vehicle.DriveType,
      planta: vehicle.PlantCity,
      paisFabricacion: vehicle.PlantCountry,
    };

    return NextResponse.json({
      success: true,
      source: "NHTSA vPIC",
      vehicle: vehicleInfo,
      message: "Información vehicular obtenida correctamente.",
    });
  } catch (error) {
    console.error("Error consultando NHTSA:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo consultar la información del vehículo.",
      },
      { status: 500 },
    );
  }
}
