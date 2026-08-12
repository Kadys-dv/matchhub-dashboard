import {render,screen} from "@testing-library/react";
import {Trophy} from "lucide-react";
import {describe,expect,it} from "vitest";
import {StatCard} from "@/components/stat-card";

describe("StatCard",()=>{
  it("apresenta indicador e contexto acessíveis",()=>{
    render(<StatCard label="Partidas abertas" value="12" helper="Disponíveis" icon={Trophy}/>);
    expect(screen.getByText("Partidas abertas")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Disponíveis")).toBeInTheDocument();
  });
});
