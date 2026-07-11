import { AssistantOption } from '../../models/assistant-option.model';

export const ASSISTANT_OPTIONS: AssistantOption[] = [
    {
        id: 'documentation',
        label: 'Documentation',
        icon: '📄',
        description:
            'Genera documentación técnica clara y estructurada para código, APIs y proyectos.',
        placeholder:
            'Describe el código que deseas documentar...',
        emptyState: `
            # 👋 Documentation Assistant

            Puedo ayudarte a generar documentación técnica clara y estructurada.

            ## Ejemplos

            - Documenta este componente Angular.

            - Explica esta clase.

            - Genera documentación para este servicio.
        `
    },
    {
        id: 'api',
        label: 'API Docs',
        icon: '🔌',

        description:
            'Especializado en documentación de APIs REST.',

        placeholder:
            'Pega un endpoint, controlador o especificación OpenAPI...',

        emptyState: `
            # 👋 API Documentation

            Puedo ayudarte a documentar APIs REST.

            ## Ejemplos

            - Documenta este endpoint.

            - Explica los parámetros.

            - Genera ejemplos de request y response.
        `
    },
    {
        id: 'readme',
        label: 'README',
        icon: '📘',

        description:
            'Genera README profesionales para tus proyectos.',

        placeholder:
            'Describe tu proyecto...',

        emptyState: `
            # 👋 README Generator

            Puedo ayudarte a crear README profesionales.

            ## Ejemplos

            - Genera un README.

            - Crea la instalación.

            - Describe la estructura del proyecto.
        `
    },
    {
        id: 'architecture',
        label: 'Architecture',
        icon: '🏗️',

        description:
            'Analiza la arquitectura y la organización del proyecto.',

        placeholder:
            'Describe la arquitectura o pega la estructura del proyecto...',

        emptyState: `
            # 👋 Architecture Assistant

            Puedo ayudarte a analizar la arquitectura del software.

            ## Ejemplos

            - Explica la estructura del proyecto.

            - Analiza los módulos.

            - Describe el flujo de la aplicación.
        `
    },
    {
        id: 'chat',
        label: 'General Chat',
        icon: '💬',

        description:
            'Asistente general para preguntas de desarrollo de software.',

        placeholder:
            'Haz una pregunta técnica...',

        emptyState: `
            # 👋 General Chat

            Pregúntame cualquier cosa relacionada con desarrollo de software.

            ## Ejemplos

            - ¿Qué son los Signals?

            - ¿Qué es CQRS?

            - ¿Cuándo utilizar Redis?
        `
    }
];