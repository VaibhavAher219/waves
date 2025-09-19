import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Resources: CollectionConfig<'resources'> = {
  slug: 'resources',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    resourceType: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'resourceType', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Case Study', value: 'case-study' },
        { label: 'Template', value: 'template' },
        { label: 'Tool', value: 'tool' },
        { label: 'eBook', value: 'ebook' },
        { label: 'Tutorial Video', value: 'tutorial-video' },
        { label: 'Event', value: 'event' },
        { label: 'Help & Support', value: 'help-support' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description that appears in resource listings',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Resource Details',
          fields: [
            {
              name: 'downloadUrl',
              type: 'text',
              admin: {
                condition: (data) => 
                  ['template', 'ebook', 'tool'].includes(data?.resourceType),
              },
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: {
                condition: (data) => data?.resourceType === 'tutorial-video',
              },
            },
            {
              name: 'eventDate',
              type: 'date',
              admin: {
                condition: (data) => data?.resourceType === 'event',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'eventLocation',
              type: 'text',
              admin: {
                condition: (data) => data?.resourceType === 'event',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}




