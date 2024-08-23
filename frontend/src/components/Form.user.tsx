import React, { useContext, useEffect, useState } from "react";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";

import { register } from "../services/auth.services";

export const FormUser = ({ user_id }: { user_id?: number }) => {
  const { get_user, update_user, get_random_color } = useUserServices();
  const { state, dispatch } = useContext(Contexts);

  const [form, setForm] = useState<User>({
    id: null,
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    email: "",
    is_active: false,
    is_staff: false,
    color: "",
    roles: [],
    is_superuser: false,
    created_at: "",
    updated_at: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response = user_id
      ? await update_user({ user_details: form })
      : await register({ data: { ...form, color: get_random_color() } });

    if (response) {
      setForm(response);
      dispatch({ type: "SET_POPUP", payload: { isOpen: false } });
    }
  };

  useEffect(() => {
    if (!user_id) return;
    const fetchCompany = async () => {
      const response = await get_user({ id: user_id });
      if (response) setForm(response);
    };

    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="w-[700px] h-full flex flex-col gap-5 py-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2 ">
        <label className="text-sm text-base font-bold col-span-1">
          Nombres
        </label>
        <input
          value={form.first_name}
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          type="text"
          name="first_name"
          id="first_name"
          disabled={
            user_id &&
            !state.auth.user.roles.includes("superuser") &&
            form.username !== state.auth.user.username
              ? true
              : false
          }
        />

        <label className="text-sm text-base font-bold col-span-1">
          Apellidos
        </label>
        <input
          value={form.last_name}
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          type="text"
          name="last_name"
          id="last_name"
          disabled={
            user_id &&
            !state.auth.user.roles.includes("superuser") &&
            form.username !== state.auth.user.username
              ? true
              : false
          }
        />

        <label className="text-sm text-base font-bold col-span-1">
          Usuario
        </label>
        <input
          value={form.username}
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          type="text"
          name="username"
          id="username"
          disabled={
            user_id &&
            !state.auth.user.roles.includes("superuser") &&
            form.username !== state.auth.user.username
              ? true
              : false
          }
        />

        <label className="text-sm text-base font-bold col-span-1">Correo</label>
        <input
          value={form.email}
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
        ></input>

        <label className="text-sm text-base font-bold col-span-1">
          Contraseña
        </label>
        <input
          value={form.password}
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          name="password"
          id="password"
        />

        <label className="text-sm text-base font-bold col-span-1">Rol</label>
        <select
          className="w-full px-2 text-sm py-5 h-5 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200 col-span-3 "
          onChange={(e) => setForm({ ...form, roles: [e.target.value] })}
          name="roles"
          id="roles"
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="w-full rounded-3xl py-2 border border-slate-300 text-slate-400">
          Cancelar
        </button>
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-3xl py-2"
        >
          {user_id ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
};
