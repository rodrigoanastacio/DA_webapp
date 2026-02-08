import { z } from 'zod'
import { FormSchema } from '../types'

export function generateZodSchema(schema: FormSchema) {
  const shape: Record<string, z.ZodTypeAny> = {}

  schema.steps.forEach((step) => {
    step.fields.forEach((field) => {
      let validator: z.ZodTypeAny = z.string()

      // Base Type Validation
      switch (field.type) {
        case 'email':
          validator = z.string().email({ message: 'E-mail inválido' })
          break
        case 'number':
          validator = z.string().refine((val) => !isNaN(Number(val)), {
            message: 'Must be a number'
          })
          break
        case 'tel':
          validator = z.string().min(10, { message: 'Telefone inválido' })
          break
        case 'checkbox':
          validator = z.boolean()
          break
        default:
          validator = z.string()
      }

      // Required / Optional
      if (!field.required) {
        if (field.type === 'checkbox') {
          validator = validator.optional()
        } else {
          validator = validator.optional().or(z.literal(''))
        }
      } else {
        if (field.type === 'checkbox') {
          validator = z.boolean().refine((val) => val === true, {
            message: 'Este campo é obrigatório'
          })
        } else {
          validator = (validator as z.ZodString).min(1, {
            message: 'Campo obrigatório'
          })
        }
      }

      // Custom Validation
      if (field.validation && field.type !== 'checkbox') {
        const stringValidator = validator as z.ZodString
        if (field.validation.min) {
          validator = stringValidator.min(field.validation.min, {
            message: `Mínimo de ${field.validation.min} caracteres`
          })
        }
        if (field.validation.max) {
          validator = stringValidator.max(field.validation.max, {
            message: `Máximo de ${field.validation.max} caracteres`
          })
        }
        if (field.validation.regex) {
          validator = stringValidator.regex(
            new RegExp(field.validation.regex),
            {
              message: field.validation.message || 'Formato inválido'
            }
          )
        }
      }

      shape[field.name] = validator
    })
  })

  return z.object(shape)
}
