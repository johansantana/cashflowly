"use client";

import DashboardCard from '../dashboardCard'
import CaretUpIcon from '../../icons/caretUp'
import { Progress, Button } from '@heroui/react'
import DashboardTable from './dashboardTable'
import DashboardBarChart from './dashboardBarChart'
import ReportIcon from '@/components/icons/report'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

interface RecomendacionesResponse {
  recomendaciones: string;
}

export default function Dashboard(props: DashboardProps) {
  const { title, ...restOfProps } = props;
  const [recomendacion, setRecomendacion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<{
    id: number;
    nombre: string;
    email: string;
  } | null>(null);
  const [saldoTotal, setSaldoTotal] = useState<number>(0);
  const [totalGastado, setTotalGastado] = useState<number>(0);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      const token = localStorage.getItem('token'); // Aquí recuperas el JWT

      if (!token) {
        console.error('No hay token disponible');
        return;
      }
      try {
        const response = await fetch(
          "https://cashflowly-service-858222718338.us-east1.run.app/api/Gasto/recomendaciones",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const data: RecomendacionesResponse = await response.json();
        setRecomendacion(data.recomendaciones);
      } catch (err: any) {
        setError(
          err.message || "Ocurrió un error al obtener las recomendaciones."
        );
        console.error("Error al obtener las recomendaciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendaciones();
  }, []);

  useEffect(() => {
    const fetchPerfilYSaldo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const perfilRes = await fetch(
          "https://cashflowly-service-858222718338.us-east1.run.app/api/Cuentas/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );

        if (!perfilRes.ok) throw new Error("Error obteniendo el perfil");
        const perfil = await perfilRes.json();
        setUsuario({
          id: perfil.id,
          nombre: perfil.nombre,
          email: perfil.email,
        });

        const cuentasRes = await fetch(
          `https://cashflowly-service-858222718338.us-east1.run.app/api/Cuentas/GetByUserId/${perfil.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );

        if (!cuentasRes.ok) throw new Error("Error obteniendo las cuentas");
        const cuentas = await cuentasRes.json();

        const total = cuentas.reduce(
          (acc: number, cuenta: any) => acc + cuenta.saldoDisponible,
          0
        );
        setSaldoTotal(total);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchPerfilYSaldo();
  }, []);

  const porcentajeUtilizado = saldoTotal > 0 ? (totalGastado / saldoTotal) * 100 : 0;
  const saldoDisponible = saldoTotal - totalGastado;
  return (
    <div className="flex h-full flex-col gap-4" {...restOfProps}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <div className="flex gap-4">
          <Button radius="full" startContent={<ReportIcon />}>
            Generar Reportes
          </Button>
        </div>
      </div>

      <div className="grid grid-flow-row flex-grow grid-rows-[.5fr_1fr_1fr] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-emerald-700">
                Presupuesto del mes
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm lg:text-sm max-w-[20ch] text-slate-900">
                Aumento del 2.7% desde el último mes.
              </span>
            </div>
            <div className="font-bold text-greenglows flex gap-2 items-end">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-3xl">
                {saldoTotal.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <CaretUpIcon />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
              <span className=" text-lg font-semibold text-emerald-700">
                Saldo disponible
              </span>
            </div>
            <Progress
              className="w-full text-slate-900 font-normal mb-1"
              color="success"
              label="Porcentaje utilizado"
              maxValue={100}
              showValueLabel={true}
              value={porcentajeUtilizado}
              size="sm"
            />
            <div className="font-bold text-greenglows flex items-end gap-2">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-3xl ">
                {saldoDisponible.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          className=" text-white bg-mutedGreen"
          variant="lightColored"
        >
          <div className="flex flex-col h-full justify-between gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold text-white">Total Gastado</span>
              <span className="text-sm text-white opacity-80">Este mes</span>
            </div>
            <div className="flex flex-col justify-center items-start text-white">
              <span className="text-4xl font-bold">
                RD$ {totalGastado.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
              </span>
              <div className="mt-4 w-full h-1 bg-white opacity-30"></div>
              <div className="flex justify-between w-full mt-2">
                <span className="text-base opacity-80">Gasto total este mes</span>
                <span className="text-base opacity-80">{`${totalGastado > 0 ? ((totalGastado / saldoTotal) * 100).toFixed(1) : 0
                  }% del saldo`}</span>
              </div>
            </div>
          </div>
        </DashboardCard>

        <div className="col-span-3 flex gap-4 h-[380px]">
          <DashboardCard className="w-[40%] bg-mutedGreen" variant="lightColored">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-xl font-semibold text-white">Recomendaciones</span>
                <span className="text-sm text-white opacity-70">Consejos personalizados para ti</span>
              </div>

              <div className="flex flex-col justify-center items-start text-white mt-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-white opacity-80">Cargando recomendaciones...</p>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-red-500 opacity-90">{error}</p>
                  </div>
                ) : recomendacion ? (
                  <p className="text-sm text-white opacity-90">{recomendacion}</p>
                ) : (
                  <p className="text-sm text-white opacity-80">No se encontraron recomendaciones.</p>
                )}

                <div className="mt-4 w-full h-1 bg-white opacity-30"></div>
                <span className="text-xs text-center text-white opacity-60 mt-2">powered by OpenAI</span>
              </div>
            </div>
          </DashboardCard>


          <DashboardCard className="w-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <DashboardTable onTotalChange={(total) => setTotalGastado(total)} />
            </div>
          </DashboardCard>
        </div>

        <div className="col-span-3 flex gap-4 ">
          <DashboardCard className="w-full">
            <DashboardBarChart />
          </DashboardCard>
          <DashboardCard
            className="w-[40%] bg-mutedGreen "
            variant="lightColored"
          />
        </div>
      </div>
    </div>
  );
}
