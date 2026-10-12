import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';
import type { Project, Author } from '../types/sanity';

export function useSanityProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(coalesce(order, 999) asc, year desc) {
          _id,
          title,
          slug,
          category,
          coverImage,
          gallery,
          year,
          technologies,
          selectedWork,
          order,
          client,
          description,
          liveUrl,
          githubUrl,
          sections
        }`;
        const data = await sanityClient.fetch<Project[]>(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, isLoading };
}

export function useSanityProject(slug?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          category,
          coverImage,
          gallery,
          year,
          technologies,
          selectedWork,
          order,
          client,
          description,
          liveUrl,
          githubUrl,
          sections
        }`;
        const data = await sanityClient.fetch<Project>(query, { slug });
        setProject(data);
      } catch (error) {
        console.error("Error fetching single project from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return { project, isLoading };
}

export function useSanityProfile() {
  const [profile, setProfile] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const query = `*[_type == "author"][0] {
          _id,
          name,
          bio,
          bioMuted,
          roles,
          location,
          sinceYear,
          experienceYears,
          email,
          phone,
          linkedinUrl,
          githubUrl,
          leetcodeUrl,
          profileImage,
          infoImage,
          stats,
          achievements,
          infoBioHeadline,
          infoBioBody,
          softwareStack,
          experience,
          "resumeUrl": coalesce(resumeFile.asset->url, resumeUrl),
          expertise,
          awards
        }`;
        const data = await sanityClient.fetch<Author>(query);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading };
}
