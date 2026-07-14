# Debug Session: verification-auth-save
- **Status**: [OPEN]
- **Issue**: Error al guardar la verificacion online; aparece `auth/admin-restricted-operation` y no persiste la solicitud.
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-verification-auth-save.ndjson

## Reproduction Steps
1. Abrir una propiedad.
2. Ingresar al modal de verificacion.
3. Completar datos y adjuntar documentacion.
4. Guardar la verificacion.
5. Observar el error mostrado en pantalla.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | La app apunta a un proyecto Firebase distinto del que se reviso en consola. | High | Low | Pending |
| B | `signInAnonymously()` falla por una configuracion de Auth/tenant aunque el proveedor figure habilitado. | High | Med | Pending |
| C | El error visible en UI no representa el fallo final y hay una falla posterior en Firestore/Storage. | Med | Med | Pending |
| D | Las variables `VITE_FIREBASE_*` se cargan incompletas o inconsistentes en runtime. | Med | Low | Pending |
| E | El flujo de verificacion llega a Auth correctamente pero falla por permisos encadenados del proyecto. | Med | Med | Pending |

## Log Evidence
- Instrumentacion agregada en `src/App.tsx` para registrar:
  - inicio del guardado,
  - proyecto Firebase activo en runtime,
  - intento y resultado de `signInAnonymously()`,
  - punto previo a la escritura en `verification_requests`.
- Build verificado correctamente luego de instrumentar.

## Verification Conclusion
Pending
