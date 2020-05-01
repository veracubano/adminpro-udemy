
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string, // el signo de interrogaciónsignifica que esa propiedad es opcional; pero las opcionales tienen que ser las últimas, es decir, después de una opcional no puede haber una propiedad obligatoria
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) { }
}
