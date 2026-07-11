import { AssistantOption } from '../../models/assistant-option.model';

export const ASSISTANT_OPTIONS: AssistantOption[] = [
    {
        id: 'documentation',
        label: 'Documentation',
        icon: 'description',
        description:
            'Genera documentación técnica clara y estructurada para código, APIs y proyectos.',
        placeholder:
            'Describe el código que deseas documentar...',
        emptyState: `
            #  <span class="material-symbols-outlined">waving_hand</span> Documentation Assistant

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
        icon: 'cable',

        description:
            'Especializado en documentación de APIs REST.',

        placeholder:
            'Pega un endpoint, controlador o especificación OpenAPI...',

        emptyState: `
            # <span class="material-symbols-outlined">waving_hand</span>  API Documentation

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
        icon: 'book_5',

        description:
            'Genera README profesionales para tus proyectos.',

        placeholder:
            'Describe tu proyecto...',

        emptyState: `
            # <span class="material-symbols-outlined">waving_hand</span>  README Generator

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
        icon: 'factory',

        description:
            'Analiza la arquitectura y la organización del proyecto.',

        placeholder:
            'Describe la arquitectura o pega la estructura del proyecto...',

        emptyState: `
            # <span class="material-symbols-outlined">waving_hand</span>  Architecture Assistant

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
        icon: 'chat',

        description:
            'Asistente general para preguntas de desarrollo de software.',

        placeholder:
            'Haz una pregunta técnica...',

        emptyState: `
            # <span class="material-symbols-outlined">waving_hand</span>  General Chat

            Pregúntame cualquier cosa relacionada con desarrollo de software.

            ## Ejemplos

            - ¿Qué son los Signals?

            - ¿Qué es CQRS?

            - ¿Cuándo utilizar Redis?
        `
    }
];